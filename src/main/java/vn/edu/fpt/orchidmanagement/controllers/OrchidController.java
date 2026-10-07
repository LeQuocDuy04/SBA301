package vn.edu.fpt.orchidmanagement.controllers;



import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.orchidmanagement.pojos.Orchid;
import vn.edu.fpt.orchidmanagement.services.OrchidService;

import java.util.List;

@RestController
@RequestMapping("/api/orchids")
public class OrchidController {

    @Autowired
    private OrchidService orchidService;

    @GetMapping
    public ResponseEntity<List<Orchid>> getAll() {
        return ResponseEntity.ok(orchidService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orchid> getById(@PathVariable Integer id) {

        Orchid orchid = orchidService.getById(id);

        if (orchid == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(orchid);
    }

    @GetMapping("/search")
    public ResponseEntity<Orchid> search(
            @RequestParam String name) {

            Orchid orchid = orchidService.findName(name);

            return ResponseEntity.ok(orchid);
    }

    @PostMapping
    public ResponseEntity<Orchid> create(@RequestBody Orchid orchid) {

        Orchid created = orchidService.create(orchid);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> update(
            @PathVariable Integer id,
            @RequestBody Orchid orchid) {

        Orchid updated = orchidService.update(id, orchid);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {

        Orchid existing = orchidService.getById(id);

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        orchidService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
