package com.example.bookstore.dao.entites;



import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;

import com.example.bookstore.web.dto.BookDTO.BookDTOBuilder;
import com.example.bookstore.web.dto.CategoryDTO;

import jakarta.persistence.Column;

// import org.springframework.hateoas.RepresentationModel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name ="books")
public class Book   extends RepresentationModel<Book>{
    // extends RepresentationModel<Book>
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String code;
    private String nom; 
    private Double prix;
    private String auteur;
    private String image;
    private String description;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
  
    public Book(String code, String nom, Double prix, String auteur, String image, String description,Category category) {
        this.code = code;
        this.nom = nom;
        this.prix = prix;
        this.auteur = auteur;
        this.image = image;
        this.category = category;
        this.description = description ;
    }
    
    public Long getId() {
        return id;
    }
    @Override
    public String toString() {
        return "Book [id=" + id + ", code=" + code + ", nom=" + nom + ", prix=" + prix + ", auteur=" + auteur
                + ", image=" + image + ", description=" + description + ", category=" + category + "]";
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public Double getPrix() {
        return prix;
    }
    public void setPrix(Double prix) {
        this.prix = prix;
    }
    public String getAuteur() {
        return auteur;
    }
    public void setAuteur(String string) {
        this.auteur = string;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }

    public void setCategory(CategoryDTO categorieById) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setCategory'");
    }

 
   
}
