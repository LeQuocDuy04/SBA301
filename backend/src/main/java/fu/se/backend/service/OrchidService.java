package fu.se.backend.service;


import fu.se.backend.entity.Orchid;
import fu.se.backend.repository.OrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrchidService {

    @Autowired
    private OrchidRepository orchidRepository;


    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    public Orchid getOrchidById(Integer id) {
        return orchidRepository.findById(id).orElse(null);
    }

    public Orchid updateOrchid(Orchid updatedOrchid) {
        return orchidRepository.save(updatedOrchid);
    }

    public void deleteOrchid(Integer id) {
        orchidRepository.deleteById(id);
    }
}
