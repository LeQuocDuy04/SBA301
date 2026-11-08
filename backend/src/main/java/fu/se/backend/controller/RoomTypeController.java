
/**
 * Author: Lê Quốc Duy
 * Controller: RoomTypeController
 */
package fu.se.backend.controller;

import fu.se.backend.entity.RoomType;
import fu.se.backend.service.RoomTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room-types")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomTypeController {

    private final RoomTypeService roomTypeService;

    public RoomTypeController(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    // GET: Get all room types
    @GetMapping
    public ResponseEntity<List<RoomType>> getAllRoomTypes() {
        return ResponseEntity.ok(roomTypeService.getAllRoomTypes());
    }

    // GET: Get room type by ID
    @GetMapping("/{id}")
    public ResponseEntity<RoomType> getRoomTypeById(
            @PathVariable Integer id) {
        return ResponseEntity.ok(roomTypeService.getRoomTypeById(id));
    }

    // POST: Create room type
    @PostMapping
    public ResponseEntity<RoomType> createRoomType(
            @RequestBody RoomType roomType) {
        RoomType created = roomTypeService.createRoomType(roomType);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT: Update room type
    @PutMapping("/{id}")
    public ResponseEntity<RoomType> updateRoomType(
            @PathVariable Integer id,
            @RequestBody RoomType roomType) {
        return ResponseEntity.ok(
                roomTypeService.updateRoomType(id, roomType)
        );
    }

    // DELETE: Delete room type
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoomType(
            @PathVariable Integer id) {
        roomTypeService.deleteRoomType(id);
        return ResponseEntity.noContent().build();
    }
}
