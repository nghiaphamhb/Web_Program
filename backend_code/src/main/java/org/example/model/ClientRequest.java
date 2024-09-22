package org.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class ClientRequest implements Serializable {
    private float R;
    private float x;
    private float y;
}
