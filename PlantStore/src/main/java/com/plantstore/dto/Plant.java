package com.plantstore.dto;

import javax.faces.bean.ManagedBean;
import javax.inject.Named;
import org.springframework.context.annotation.Scope;

@Named
@ManagedBean
@Scope("session")
public class Plant {
	private String name;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return name;
	}
	
	
	

}
