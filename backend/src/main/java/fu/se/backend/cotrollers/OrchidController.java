package fu.se.backend.cotrollers;


import fu.se.backend.entity.Orchid;
import fu.se.backend.service.OrchidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orchids")
public class OrchidController {

    @Autowired
    private OrchidService orchidService;

    @GetMapping
    public ResponseEntity<List<Orchid>> getAllOrchids() {
        List<Orchid> orchids = orchidService.getAllOrchids();
        return ResponseEntity.ok(orchids);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orchid> getOrchidById(@PathVariable Integer id) {
        Orchid orchid = orchidService.getOrchidById(id);
        if (orchid != null) {
            return ResponseEntity.ok(orchid);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(@PathVariable Integer id, @RequestBody Orchid updatedOrchid) {
        Orchid orchid = orchidService.getOrchidById(id);
        if (orchid != null) {
            updatedOrchid.setOrchidId(id);
            Orchid savedOrchid = orchidService.updateOrchid(updatedOrchid);
            return ResponseEntity.ok(savedOrchid);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Orchid> createOrchid(@RequestBody Orchid newOrchid) {
        Orchid savedOrchid = orchidService.updateOrchid(newOrchid);
        return ResponseEntity.ok(savedOrchid);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrchid(@PathVariable Integer id) {
        Orchid orchid = orchidService.getOrchidById(id);
        if (orchid != null) {
            orchidService.deleteOrchid(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
