package com.spring.rest.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class FlashCards {

	@Id
	public String _id;
	 
	public String question;
	public String answer;
  
	public FlashCards() {}

	public FlashCards(String _id, String question, String answer) {
		super();
		this._id = _id;
		this.question = question;
		this.answer = answer;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}
	  
	  
}
