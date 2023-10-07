package com.plantstore.ui;


import javax.faces.bean.ManagedBean;
import javax.inject.Named;

import org.springframework.context.annotation.Scope;

@Named
@ManagedBean
@Scope("session")

public class Application {
	private String slogan = "Promoting Plant Diversity Through Education";

	/**
	 * @return the slogan
	 */
	public String getSlogan() {
		return slogan;
	}

	/**
	 * @param slogan the slogan to set
	 */
	public void setSlogan(String slogan) {
		this.slogan = slogan;
	}

}
