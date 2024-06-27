package com.example.bookstore.web.models.requests;

public class BookForm {
    private String code;
    private String name;
    private Double prix;
    // private Integer quantity;
    private String auteur;
    private String description;

    private String image;
    private Long categoryId;

    // Getters and Setters
    public String getCode() {
        return code;
    }

    public String getAuteur() {
        return auteur;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    // public Integer getQuantity() {
    //     return quantity;
    // }

    // public void setQuantity(Integer quantity) {
    //     this.quantity = quantity;
    // }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

    

