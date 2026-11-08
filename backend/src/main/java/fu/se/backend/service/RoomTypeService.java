/**
 * Author: Lê Quốc Duy
 * Service: RoomTypeService
 */
package fu.se.backend.service;

import fu.se.backend.entity.RoomType;
import fu.se.backend.repository.RoomTypeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;

    public RoomTypeService(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    // Get all room types
    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    // Get room type by ID
    public RoomType getRoomTypeById(Integer id) {
        return roomTypeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Room type not found"
                ));
    }

    // Create room type
    public RoomType createRoomType(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }

    // Update room type
    public RoomType updateRoomType(Integer id, RoomType request) {
        RoomType existing = getRoomTypeById(id);

        existing.setRoomTypeName(request.getRoomTypeName());
        existing.setTypeDescription(request.getTypeDescription());
        existing.setTypeNote(request.getTypeNote());

        return roomTypeRepository.save(existing);
    }

    // Delete room type
    public void deleteRoomType(Integer id) {
        RoomType roomType = getRoomTypeById(id);
        roomTypeRepository.delete(roomType);
    }
}