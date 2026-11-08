
/**
 * Author: Lê Quốc Duy
 * Service: RoomInformationService
 */
package fu.se.backend.service;

import fu.se.backend.dto.room.RoomInformationRequest;
import fu.se.backend.dto.room.RoomInformationResponse;
import fu.se.backend.entity.RoomInformation;
import fu.se.backend.entity.RoomType;
import fu.se.backend.repository.BookingDetailRepository;
import fu.se.backend.repository.RoomInformationRepository;
import fu.se.backend.repository.RoomTypeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class RoomInformationService {

    private final RoomInformationRepository roomRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final BookingDetailRepository bookingDetailRepository;

    public RoomInformationService(
            RoomInformationRepository roomRepository,
            RoomTypeRepository roomTypeRepository,
            BookingDetailRepository bookingDetailRepository) {

        this.roomRepository = roomRepository;
        this.roomTypeRepository = roomTypeRepository;
        this.bookingDetailRepository = bookingDetailRepository;
    }

    // Convert Entity to Response DTO
    private RoomInformationResponse toResponse(RoomInformation room) {
        RoomInformationResponse response = new RoomInformationResponse();

        response.setRoomId(room.getRoomId());
        response.setRoomNumber(room.getRoomNumber());
        response.setRoomDetailDescription(room.getRoomDetailDescription());
        response.setRoomMaxCapacity(room.getRoomMaxCapacity());
        response.setRoomTypeId(room.getRoomType().getRoomTypeId());
        response.setRoomTypeName(room.getRoomType().getRoomTypeName());
        response.setRoomStatus(room.getRoomStatus());
        response.setRoomPricePerDay(room.getRoomPricePerDay());

        return response;
    }

    // Get RoomType by ID
    private RoomType getRoomType(Integer roomTypeId) {
        return roomTypeRepository.findById(roomTypeId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Room type not found"
                ));
    }

    // Get all rooms
    @Transactional(readOnly = true)
    public List<RoomInformationResponse> getAllRooms() {
        return roomRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Get room by ID
    @Transactional(readOnly = true)
    public RoomInformationResponse getRoomById(Integer id) {
        RoomInformation room = roomRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Room not found"
                ));

        return toResponse(room);
    }

    // Create room
    public RoomInformationResponse createRoom(RoomInformationRequest request) {
        RoomInformation room = new RoomInformation();

        room.setRoomNumber(request.getRoomNumber());
        room.setRoomDetailDescription(request.getRoomDetailDescription());
        room.setRoomMaxCapacity(request.getRoomMaxCapacity());
        room.setRoomType(getRoomType(request.getRoomTypeId()));
        room.setRoomStatus(request.getRoomStatus());
        room.setRoomPricePerDay(request.getRoomPricePerDay());

        return toResponse(roomRepository.save(room));
    }

    // Update room
    public RoomInformationResponse updateRoom(
            Integer id,
            RoomInformationRequest request) {

        RoomInformation room = roomRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Room not found"
                ));

        room.setRoomNumber(request.getRoomNumber());
        room.setRoomDetailDescription(request.getRoomDetailDescription());
        room.setRoomMaxCapacity(request.getRoomMaxCapacity());
        room.setRoomType(getRoomType(request.getRoomTypeId()));
        room.setRoomStatus(request.getRoomStatus());
        room.setRoomPricePerDay(request.getRoomPricePerDay());

        return toResponse(roomRepository.save(room));
    }

    // Delete room
    public void deleteRoom(Integer id) {
        RoomInformation room = roomRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Room not found"
                ));

        boolean isUsed = bookingDetailRepository
                .existsByRoomInformation_RoomId(id);

        if (isUsed) {
            // Keep historical booking data
            room.setRoomStatus((byte) 0);
            roomRepository.save(room);
        } else {
            roomRepository.delete(room);
        }
    }
}
