package com.web.web_app.services;

import java.util.List;

public interface Service<T>{
    List<T> getAll();
    T create(T entity);
    T update(Long id, T entity);
    void delete(Long id);
    T getById(Long id);
}
