package com.tieppv.beprojecttest.controller;


import java.util.Base64;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api")
public class MainController {

	@PostMapping(path = "/convert")
	@ResponseBody
	public String convertToBase64(@RequestBody Map<String, String> request) {
		String result = "";
		String inputString = request.get("inputString").replace("\"", "");
		String convertType =  request.get("convertType");
			
		//System.out.print(inputString);
		if(convertType.equals("stringtobase64")) {
			result = encodeString(inputString);
		}else if(convertType.equals("base64tostring")){
			result = decodeString(inputString);
		}
		
		return result;
	}
	
	private String encodeString(String input) {
		String convertedString = Base64.getEncoder().encodeToString(input.getBytes());
		Gson gson= new GsonBuilder().create();
		return gson.toJson(convertedString);
	}
	private String decodeString(String input) {
		byte[] decodedBytes = Base64.getDecoder().decode(input);
		Gson gson= new GsonBuilder().create();
		return gson.toJson(new String(decodedBytes));
	}
}
