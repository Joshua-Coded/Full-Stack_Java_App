package com.plantstore.dto;

import javax.faces.bean.ManagedBean;
import javax.inject.Named;
import org.springframework.context.annotation.Scope;

@Named
@ManagedBean
@Scope("session")
public class Plant {
	private String name;
	private String genus;
	private String species;
	private String cultivar;
	private String common;

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
	
	public String getGenus() {
		return genus;
	}

	public void setGenus(String genus) {
		this.genus = genus;
	}

	public String getSpecies() {
		return species;
	}

	public void setSpecies(String species) {
		this.species = species;
	}

	public String getCultivar() {
		return cultivar;
	}

	public void setCultivar(String cultivar) {
		this.cultivar = cultivar;
	}

	public String getCommon() {
		return common;
	}

	public void setCommon(String common) {
		this.common = common;
	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return genus + " " + species + " " + cultivar + " " + common;
	}

	

}
