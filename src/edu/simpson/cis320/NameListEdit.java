package edu.simpson.cis320;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import com.google.gson.Gson;



@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {
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
            Gson gson = new Gson();
            makePerson fromJson = gson.fromJson(requestString, makePerson.class);

            // Make sure our field was set.
            out.println("Object test: " + fromJson.getFirst() + " " + fromJson.getLast()
                    + " " + fromJson.getEmail() + " " + fromJson.getPhone() + " " + fromJson.getBirthday());

            PersonDAO.createPerson(fromJson);

        } catch(Exception e){
            e.printStackTrace();
        }
    }

}
