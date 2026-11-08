/**
 * Author: Lê Quốc Duy
 * Service: BookingDetailService
 */
package fu.se.backend.service;

import fu.se.backend.dto.booking.BookingDetailRequest;
import fu.se.backend.dto.booking.BookingDetailResponse;
import fu.se.backend.entity.BookingDetail;
import fu.se.backend.entity.BookingDetailId;
import fu.se.backend.entity.BookingReservation;
import fu.se.backend.entity.RoomInformation;
import fu.se.backend.repository.BookingDetailRepository;
import fu.se.backend.repository.BookingReservationRepository;
import fu.se.backend.repository.RoomInformationRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class BookingDetailService {

    private final BookingDetailRepository bookingDetailRepository;
    private final BookingReservationRepository bookingReservationRepository;
    private final RoomInformationRepository roomInformationRepository;

    public BookingDetailService(
            BookingDetailRepository bookingDetailRepository,
            BookingReservationRepository bookingReservationRepository,
            RoomInformationRepository roomInformationRepository) {

        this.bookingDetailRepository = bookingDetailRepository;
        this.bookingReservationRepository = bookingReservationRepository;
        this.roomInformationRepository = roomInformationRepository;
    }

    // Convert Entity to Response DTO
    private BookingDetailResponse toResponse(BookingDetail detail) {

        BookingDetailResponse response = new BookingDetailResponse();

        response.setBookingReservationId(
                detail.getBookingReservation().getBookingReservationId());

        response.setRoomId(
                detail.getRoomInformation().getRoomId());

        response.setRoomNumber(
                detail.getRoomInformation().getRoomNumber());

        response.setStartDate(detail.getStartDate());
        response.setEndDate(detail.getEndDate());
        response.setActualPrice(detail.getActualPrice());

        return response;
    }

    // Get all booking details
    public List<BookingDetailResponse> getAllBookingDetails() {

        return bookingDetailRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Get booking details by booking reservation ID
    public List<BookingDetailResponse> getByBookingReservationId(
            Integer bookingReservationId) {

        if (!bookingReservationRepository.existsById(bookingReservationId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Booking reservation not found");
        }

        return bookingDetailRepository
                .findByBookingReservation_BookingReservationId(
                        bookingReservationId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Create booking detail
    @Transactional
    public BookingDetailResponse createBookingDetail(
            BookingDetailRequest request) {

        if (!request.getStartDate().isBefore(request.getEndDate())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "End date must be after start date");
        }

        BookingReservation booking = bookingReservationRepository
                .findById(request.getBookingReservationId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Booking reservation not found"));

        RoomInformation room = roomInformationRepository
                .findById(request.getRoomId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Room not found"));

        boolean isOverlapping =
                bookingDetailRepository.existsOverlappingBooking(
                        request.getRoomId(),
                        request.getStartDate(),
                        request.getEndDate());

        if (isOverlapping) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Room is already booked during this period");
        }

        BookingDetailId id = new BookingDetailId();
        id.setBookingReservationId(
                request.getBookingReservationId());
        id.setRoomId(request.getRoomId());

        BookingDetail detail = new BookingDetail();
        detail.setId(id);
        detail.setBookingReservation(booking);
        detail.setRoomInformation(room);
        detail.setStartDate(request.getStartDate());
        detail.setEndDate(request.getEndDate());
        detail.setActualPrice(request.getActualPrice());

        BookingDetail saved = bookingDetailRepository.save(detail);

        return toResponse(saved);
    }

    // Delete booking detail
    @Transactional
    public void deleteBookingDetail(
            Integer bookingReservationId,
            Integer roomId) {

        BookingDetailId id = new BookingDetailId();
        id.setBookingReservationId(bookingReservationId);
        id.setRoomId(roomId);

        if (!bookingDetailRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Booking detail not found");
        }

        bookingDetailRepository.deleteById(id);
    }
}