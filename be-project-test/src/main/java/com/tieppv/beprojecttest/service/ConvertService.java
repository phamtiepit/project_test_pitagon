package com.tieppv.beprojecttest.service;

import java.io.IOException;
import java.util.Base64;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Service
public class ConvertService {
	
	public String encodeString(String input) {
		String convertedString = Base64.getEncoder().encodeToString(input.getBytes());
		Gson gson= new GsonBuilder().create();
		return gson.toJson(convertedString);
	}
	public String decodeString(String input) {
		String stringConverted = "";
	
		try {
			byte[] decodedBytes = Base64.getDecoder().decode(input);
			stringConverted = new String(decodedBytes);
		}catch(IllegalArgumentException iae){
			stringConverted = "invalid";
		}
		Gson gson= new GsonBuilder().create();
		return gson.toJson(stringConverted);
	}
	
	public String encodeImageToBase64(MultipartFile file) {
		String base64Image = "";
		try {
			base64Image = Base64.getEncoder().encodeToString(file.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		Gson gson= new GsonBuilder().create();
		return gson.toJson(new String(base64Image));
	}
	public String getImageFromBase64(String base64String){
		Gson gson= new GsonBuilder().create();
		return gson.toJson(new String(base64String));
	}
}
