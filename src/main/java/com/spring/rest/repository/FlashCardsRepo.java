package com.spring.rest.repository;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.spring.rest.model.FlashCards;

public interface FlashCardsRepo extends MongoRepository<FlashCards, String> {
	
	
	
	FlashCards findBy_id(ObjectId _id);
	
}
