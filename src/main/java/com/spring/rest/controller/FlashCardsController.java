package com.spring.rest.controller;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.rest.model.FlashCards;
import com.spring.rest.repository.FlashCardsRepo;

@RestController
@RequestMapping(value = {"","/api"})
public class FlashCardsController {
	
	/*
	 * @AutoWired creates an instance of the 
	 * FlashCardsRepo object that will allow us 
	 * to access and modify the flashcards database
	*/
	@Autowired
private Environment environment;
	
	ObjectMapper om = new ObjectMapper();
	@Autowired
	private FlashCardsRepo fcRepo;
	private List<FlashCards> fcList = new ArrayList<FlashCards>();

	@RequestMapping(value = {"/flashcards"})
	public ResponseEntity<List<FlashCards>> getAllFlashCards() {
		List profileList = Arrays.asList(environment.getActiveProfiles());
		System.out.println(profileList.toString());
	  fcList = fcRepo.findAll();
	  if(fcList.isEmpty()) {
		  return new ResponseEntity<List<FlashCards>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
      }
      return new ResponseEntity<List<FlashCards>>(fcList, HttpStatus.OK);
	}
	
	private boolean flashCardExists(FlashCards fc) {
		for(FlashCards f : fcList) {
			if(f.getQuestion().equals(fc.getQuestion()))
				return true;
		}
		return false;
		
	}
	@RequestMapping(value="/flashcards", method = RequestMethod.POST)
	public ResponseEntity<FlashCards> createFlashCards(@Valid @RequestBody FlashCards fc) {
		if(fc == null) {
			return new ResponseEntity<FlashCards>(HttpStatus.NO_CONTENT);
		}else if(flashCardExists(fc)) {
			return new ResponseEntity<FlashCards>(HttpStatus.CONFLICT);
		}
		
		fc.set_id(ObjectId.get().toString());
		fcRepo.save(fc);
		return new ResponseEntity<FlashCards>(fc, HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/flashcards/{id}", method = RequestMethod.PUT)
	public ResponseEntity<FlashCards> modifyFlashCardsById(@PathVariable("id") String id ,@Valid @RequestBody FlashCards fc) throws JsonProcessingException {
		FlashCards updateFc = fcRepo.findBy_id(new ObjectId(id));
		
		if(updateFc == null)
			return new ResponseEntity<FlashCards>(HttpStatus.NOT_FOUND);
		
		fc.set_id(id);
		fcRepo.save(fc);
		return new ResponseEntity<FlashCards>(fc,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/flashcards/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteFlashCard(@PathVariable String id) {
		FlashCards fc = fcRepo.findBy_id(new ObjectId(id));
		
		if(fc == null)
			return new ResponseEntity<String>(id,HttpStatus.NOT_FOUND);
		
		fcRepo.delete(fc);
		return new ResponseEntity<String>(id,HttpStatus.OK);
	}
}
