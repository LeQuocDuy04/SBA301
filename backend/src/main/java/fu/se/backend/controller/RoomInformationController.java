/**
 * Author: Lê Quốc Duy
 * Controller: RoomInformationController
 */
package fu.se.backend.controller;

import fu.se.backend.dto.room.RoomInformationRequest;
import fu.se.backend.dto.room.RoomInformationResponse;
import fu.se.backend.service.RoomInformationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomInformationController {

    private final RoomInformationService roomService;

    public RoomInformationController(RoomInformationService roomService) {
        this.roomService = roomService;
    }

    // Get all rooms
    @GetMapping
    public ResponseEntity<List<RoomInformationResponse>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    // Get room by ID
    @GetMapping("/{id}")
    public ResponseEntity<RoomInformationResponse> getRoomById(
            @PathVariable Integer id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    // Create room
    @PostMapping
    public ResponseEntity<RoomInformationResponse> createRoom(
            @Valid @RequestBody RoomInformationRequest request) {
        RoomInformationResponse response = roomService.createRoom(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Update room
    @PutMapping("/{id}")
    public ResponseEntity<RoomInformationResponse> updateRoom(
            @PathVariable Integer id,
            @Valid @RequestBody RoomInformationRequest request) {
        return ResponseEntity.ok(roomService.updateRoom(id, request));
    }

    // Delete room
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Integer id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}