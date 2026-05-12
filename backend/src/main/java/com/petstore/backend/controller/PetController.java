package com.petstore.backend.controller;

import com.petstore.backend.model.Pet;
import com.petstore.backend.service.PetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    /**
     * GET /api/pets
     * Optional query params: species, status
     */
    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets(
            @RequestParam(required = false) String species,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(petService.getAllPets(species, status));
    }

    /**
     * GET /api/pets/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        return ResponseEntity.ok(petService.getPetById(id));
    }

    /**
     * POST /api/pets
     */
    @PostMapping
    public ResponseEntity<Pet> createPet(@Valid @RequestBody Pet pet) {
        Pet created = petService.createPet(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * PUT /api/pets/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(
            @PathVariable Long id,
            @Valid @RequestBody Pet pet) {
        return ResponseEntity.ok(petService.updatePet(id, pet));
    }

    /**
     * DELETE /api/pets/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.noContent().build();
    }
}
