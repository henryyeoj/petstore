package com.petstore.backend;

import com.petstore.backend.model.Pet;
import com.petstore.backend.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final PetRepository petRepository;

    @Override
    public void run(String... args) {
        if (petRepository.count() > 0) {
            log.info("Database already seeded – skipping.");
            return;
        }

        log.info("Seeding sample pets...");
        petRepository.saveAll(List.of(
            Pet.builder().name("Buddy").species("Dog").breed("Golden Retriever")
               .age(12).price(new BigDecimal("350.00"))
               .description("Playful and friendly golden retriever puppy.")
               .imageUrl("https://images.unsplash.com/photo-1552053831-71594a27632d?w=400")
               .status("AVAILABLE").build(),

            Pet.builder().name("Whiskers").species("Cat").breed("Persian")
               .age(6).price(new BigDecimal("200.00"))
               .description("Calm and fluffy Persian cat, loves cuddles.")
               .imageUrl("https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400")
               .status("AVAILABLE").build(),

            Pet.builder().name("Rio").species("Bird").breed("Macaw")
               .age(24).price(new BigDecimal("950.00"))
               .description("Colorful and vocal Blue-and-Gold Macaw.")
               .imageUrl("https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400")
               .status("AVAILABLE").build(),

            Pet.builder().name("Nemo").species("Fish").breed("Clownfish")
               .age(2).price(new BigDecimal("25.00"))
               .description("Vibrant orange clownfish, great for aquariums.")
               .imageUrl("https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=400")
               .status("AVAILABLE").build(),

            Pet.builder().name("Max").species("Dog").breed("German Shepherd")
               .age(18).price(new BigDecimal("500.00"))
               .description("Loyal, intelligent German Shepherd.")
               .imageUrl("https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400")
               .status("AVAILABLE").build(),

            Pet.builder().name("Luna").species("Cat").breed("Siamese")
               .age(8).price(new BigDecimal("275.00"))
               .description("Elegant Siamese with striking blue eyes.")
               .imageUrl("https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400")
               .status("RESERVED").build(),

            Pet.builder().name("Tweety").species("Bird").breed("Canary")
               .age(12).price(new BigDecimal("60.00"))
               .description("Beautiful yellow canary with a melodious song.")
               .imageUrl("https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400")
               .status("AVAILABLE").build(),

            Pet.builder().name("Goldie").species("Fish").breed("Goldfish")
               .age(1).price(new BigDecimal("10.00"))
               .description("Classic orange goldfish, perfect starter pet.")
               .imageUrl("https://images.unsplash.com/photo-1576874263743-d38d0e65ccb3?w=400")
               .status("AVAILABLE").build()
        ));
        log.info("Seeding complete – {} pets added.", petRepository.count());
    }
}
