package edu.simpson.cis320;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import com.google.gson.Gson;

@WebServlet(name = "NameListGet")
public class NameListGet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        List <Person> peopleList = PersonDAO.getPeople();

        // Replace the line below with your database code that will
        // write out your JSON file.
        Gson gson = new Gson();
        String json = gson.toJson(peopleList);

        out.print(json);


    }
}
