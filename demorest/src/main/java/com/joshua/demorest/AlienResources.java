package com.joshua.demorest;

import jakarta.ws.rs.*;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("aliens")
public class AlienResources {
	@GET
	@Produces(MediaType.APPLICATION_XML)
	public Alien getAlien() {
		Alien a1 = new Alien();
		a1.setName("Joshua");
		a1.setPoints(97);
		
		return a1;
	}
}
