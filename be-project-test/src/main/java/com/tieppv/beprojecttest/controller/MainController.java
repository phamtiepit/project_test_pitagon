package com.tieppv.beprojecttest.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tieppv.beprojecttest.service.ConvertService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api")
public class MainController {

	@Autowired
	ConvertService convertService;
	
	
	@PostMapping(path = "/convert")
	@ResponseBody
	public String convertToBase64(@RequestBody Map<String, String> request) {
		String result = "";
		String inputString = request.get("inputString").replace("\"", "");
		String convertType =  request.get("convertType");
			
		switch(convertType) {
		  case "stringtobase64":
			  result = convertService.encodeString(inputString);
		    break;
		    
		  case "base64tostring":
			  result = convertService.decodeString(inputString);
		    break;
		}
		//System.out.print(inputString);
		return result;
	}
	
	
	
	@PostMapping(path = "/convert/image")
	@ResponseBody
	public String encodeImage(@RequestParam("image") MultipartFile image) {
		
		System.out.print(image);
		
		return null;
	}
}
