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
@RequestMapping(path = "/api/convert")
public class MainController {

	@Autowired
	ConvertService convertService;
	
	
	@PostMapping(path = "/encodeString")
	@ResponseBody
	public String convertStringToBase64(@RequestBody Map<String, String> request) {
		String inputString = request.get("inputString").replace("\"", "");
		return convertService.encodeString(inputString);
		//System.out.print(inputString);
	}

	@PostMapping(path = "/decodeString")
	@ResponseBody
	public String convertBase64ToString(@RequestBody Map<String, String> request) {
		String inputString = request.get("inputString").replace("\"", "");
		return convertService.decodeString(inputString);
		//System.out.print(inputString);
	}
	
	
	@PostMapping(path = "/endcodeImage")
	@ResponseBody
	public String encodeImage(@RequestParam("imageFile") MultipartFile imageFile) {
		return convertService.encodeImageToBase64(imageFile);
	}

	@PostMapping(path = "/getImage")
	@ResponseBody
	public String getImage(@RequestBody Map<String, String> request) {
		String base64String = request.get("base64String").replace("\"", "");
		return convertService.getImageFromBase64(base64String);
	}
}
