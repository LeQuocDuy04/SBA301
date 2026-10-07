package vn.edu.fpt.orchidmanagement.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fpt.orchidmanagement.pojos.Orchid;
import vn.edu.fpt.orchidmanagement.repositories.OrchidRepository;

import java.util.List;

@Service
public class OrchidService {

    @Autowired
    private OrchidRepository orchidRepository;


    public List<Orchid> getAll() {
        return orchidRepository.findAll();
    }

    public Orchid getById(Integer id) {
        return orchidRepository.findById(id).orElse(null);
    }

    public Orchid create(Orchid orchid) {
        Orchid newOrchid = orchidRepository.save(orchid);
        if (newOrchid == null){
            return null;
        }

        return newOrchid;
    }

    public Orchid update(Integer id, Orchid orchid) {
        Orchid currentOrchid = getById(id);

        if(currentOrchid==null){
            return null;
        }

        return orchidRepository.save(orchid);
    }

    public void delete(Integer id) {

        Orchid orchid = getById(id);

        orchidRepository.delete(orchid);
    }

    public Orchid findName(String name) {
        Orchid orchid = orchidRepository.findByOrchidNameContainingIgnoreCase(name);
        if(orchid == null){
            return null;
        }

        return orchid;
    }
}
