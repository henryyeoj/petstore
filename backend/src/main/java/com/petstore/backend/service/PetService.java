package com.petstore.backend.service;

import com.petstore.backend.exception.ResourceNotFoundException;
import com.petstore.backend.model.Pet;
import com.petstore.backend.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PetService {

    private final PetRepository petRepository;

    // ── CREATE ────────────────────────────────────────────────────────────────
    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }

    // ── READ ALL (with optional filters) ─────────────────────────────────────
    @Transactional(readOnly = true)
    public List<Pet> getAllPets(String species, String status) {
        if (species == null && status == null) {
            return petRepository.findAll();
        }
        return petRepository.findByFilters(species, status);
    }

    // ── READ ONE ──────────────────────────────────────────────────────────────
    @Transactional(readOnly = true)
    public Pet getPetById(Long id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id: " + id));
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────
    public Pet updatePet(Long id, Pet updated) {
        Pet existing = getPetById(id);
        existing.setName(updated.getName());
        existing.setSpecies(updated.getSpecies());
        existing.setBreed(updated.getBreed());
        existing.setAge(updated.getAge());
        existing.setPrice(updated.getPrice());
        existing.setDescription(updated.getDescription());
        existing.setImageUrl(updated.getImageUrl());
        existing.setStatus(updated.getStatus());
        return petRepository.save(existing);
    }

    // ── DELETE ────────────────────────────────────────────────────────────────
    public void deletePet(Long id) {
        Pet existing = getPetById(id);
        petRepository.delete(existing);
    }
}
