package com.plantstore.dao;

import java.util.List;

import org.hibernate.Session;

import com.plantstore.dto.Plant;

public class PlantHbmDAO implements IPlantDAO {

	@Override
	public List<Plant> fetchPlants() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insertPlant(Plant plant) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void update(Plant plant) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(Plant plant) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void save(Plant plant) {
		// save the plant to the database
		Session session = HibernateUtill.getSessionFactory().openSession();
		session.beginTransaction();
		
		session.save(plant);
		
		session.getTransaction().commit();

	}

}
