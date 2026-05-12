package com.petstore.backend.repository;

import com.petstore.backend.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> findBySpeciesIgnoreCase(String species);

    List<Pet> findByStatusIgnoreCase(String status);

    List<Pet> findBySpeciesIgnoreCaseAndStatusIgnoreCase(String species, String status);

    @Query("SELECT p FROM Pet p WHERE " +
           "(:species IS NULL OR LOWER(p.species) = LOWER(:species)) AND " +
           "(:status  IS NULL OR LOWER(p.status)  = LOWER(:status))")
    List<Pet> findByFilters(@Param("species") String species,
                            @Param("status")  String status);
}
