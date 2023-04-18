package com.green.car.wash.config;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.GetMapping;

import com.green.car.wash.service.UserDetailsServiceImpl;
import com.green.car.wash.util.AuthEntryPointJwt;
import com.green.car.wash.util.AuthTokenFilter;




@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		  prePostEnabled = true,
		  securedEnabled = true,
		  jsr250Enabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	UserDetailsServiceImpl userDetailsService;


	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
//				.antMatchers("/owner/**").permitAll()
//				.antMatchers("/manager/**").permitAll()
				.antMatchers("/users/**").permitAll()
				.antMatchers("/api/auth/**").permitAll()
				.antMatchers("/manage/**").permitAll()
				.anyRequest()
				.authenticated();

		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}


}
