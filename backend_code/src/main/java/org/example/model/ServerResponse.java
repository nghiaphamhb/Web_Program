package org.example.model;

import lombok.AllArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@AllArgsConstructor
public class ServerResponse implements Serializable {
    private  float x;
    private float y;
    private Boolean inArea;
    private String reponseTime;
}
