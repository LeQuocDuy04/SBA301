package vn.edu.fpt.orchidmanagement.pojos;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "orchids")
@Data
public class Orchid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private Integer orchidId;

    @Column(name = "orchid_name", nullable = false)
    private String orchidName;

    @Column(name = "is_natural")
    private boolean isNatural;

    @Column(name = "orchid_description")
    private String orchidDescription;

    @Column(name = "is_attractive")
    private boolean isAttractive;

    @Column(name = "orchid_url")
    private String orchidURL;


    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}