package com.example.web_lab_4.users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name = "users")
public class User implements Serializable {
  @Id
  @GeneratedValue
  private Long id;

  private String login;
  private String hashedPassword;

  public User(){}

  public User(String login, String hashedPassword) {
    this.login = login;
    this.hashedPassword = hashedPassword;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public String getHashedPassword() {
    return hashedPassword;
  }

  public void setHashedPassword(String hashedPassword) {
    this.hashedPassword = hashedPassword;
  }
}
