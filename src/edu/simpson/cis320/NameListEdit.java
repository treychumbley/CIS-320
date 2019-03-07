package edu.simpson.cis320;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import com.google.gson.Gson;
import org.w3c.dom.NameList;

import java.util.regex.Matcher;
import  java.util.regex.Pattern;



@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {

    // This will hold our compiled regular expression
    // You'll need one of these for each field
    // Name it according to the actual field name. Do not use "fieldname"
    private Pattern firstName;
    private Pattern lastName;
    private Pattern email;
    private Pattern phone;
    private Pattern birthday;


    //Our Constructor
    public NameListEdit(){
        // --- Compile and set up all the regular expression patterns here ---
        firstName = Pattern.compile("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]{1,45}$");
        lastName = Pattern.compile("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]{1,45}$");
        email = Pattern.compile("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$");
        phone = Pattern.compile("^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$");
        birthday = Pattern.compile("^([0-9]{4})-([0-9]{2})-([0-9]{2})$");
    }

    /*
     Handle Post requests
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
            response.setContentType("text/plain");
            PrintWriter out = response.getWriter();

            // Just confirm we are calling the servlet we think we are
            out.println("JSON Post");

            // Open the request for reading. Read in each line, put it into a string.
            // Yes, I think there should be an easier way.
            java.io.BufferedReader in = request.getReader();
            String requestString = new String();
            for (String line; (line = in.readLine()) != null; requestString += line) ;

            // Output the string we got as a request, just as a check
            System.out.println(requestString);

            // Great! Now we want to use GSON to parse the object, and pop it into our business object. Field
            // names have to match. That's the magic.
            out.println(requestString);
            Gson gson = new Gson();

            Person newPerson = gson.fromJson(requestString, Person.class);

            String first = newPerson.getFirst();
            String last = newPerson.getLast();
            String perEmail = newPerson.getEmail();
            String phoneNum = newPerson.getPhone();
            String birthdayDate = newPerson.getBirthday();


            // Make sure our field was set.
            out.println("Object test: " + first + " " + last + " " + perEmail + " " + phoneNum
                    + " " + birthdayDate);

            // Now create matcher object.
            Matcher f = firstName.matcher(first);
            Matcher l = lastName.matcher(last);
            Matcher e = email.matcher(perEmail);
            Matcher p = phone.matcher(phoneNum);
            Matcher b = birthday.matcher(birthdayDate);
            boolean good = true;

            if (f.find()){
                System.out.println("First is valid");
            } else {
                System.out.println("First is invalid");
                good = false;
            }

            if (l.find()){
                System.out.println("Last is valid");
            } else {
                System.out.println("Last is invalid");
                good = false;
            }

            if (e.find()){
                System.out.println("Email is valid");
            } else {
                System.out.println("Email is invalid");
                good = false;
            }

            if (p.find()){
                System.out.println("Phone is valid");
            } else {
                System.out.println("Phone is invalid");
                good = false;
            }

            if (b.find()){
                System.out.println("Birthday is valid");
            } else {
                System.out.println("Birthday is invalid");
                good = false;
            }


            if (good == true){
                PersonDAO.createPerson(newPerson);
                System.out.println("All fields are valid.");
            } else {
                System.out.println("Not all fields are valid.");
            }



        } catch(Exception e){
            e.printStackTrace();
        }
    }

}
