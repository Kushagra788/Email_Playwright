//@ts-check

import { Selectors } from "../pages/page_objects.spec";
import {expect, test} from "@playwright/test";
const Mailosaur =require('mailosaur') //importing Mailosaur  

//adding apiKey,server-Id,and email(server domain) generated from Mailosaur account
const apiKey= 'izSByjGEFhcIKBOf896Q3dgOqfAGhUzi'
const mailosaur = new Mailosaur(apiKey)
const serverID= '4pchnn7k'
const serverDomain = '@4pchnn7k.mailosaur.net'
let emailAddress


test('SignUp',async({page})=>{
    await page.goto(Selectors.URL);
    const random=new Date().getTime() //creating a unique identifier for email address
    emailAddress=`${random}${serverDomain}` 

    //Signing up(Logging into Mailosaur account)
    await page.click(Selectors.signup_link)
    await page.fill(Selectors.first_name,'Kushagra')
    await page.fill(Selectors.last_name,'Agarwal')
    await page.fill(Selectors.email,emailAddress)
    await page.click(Selectors.submit_button)

    const email=await mailosaur.messages.get(serverID,{sentTo:emailAddress}) //fetching email by server-Id
    await expect (email.subject).toEqual('Welcome to ACME Product') //verifying email by subject
    let confirm_signUp_link = email.html.links[0].href //verifying account by using email
    await page.goto(confirm_signUp_link) 

})