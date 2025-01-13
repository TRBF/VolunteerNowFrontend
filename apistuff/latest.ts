import { url_endpoint } from "./_config";

export async function getCallouts () {
  const url = url_endpoint + "/api/get_callouts";
  let response = await fetch(url);
  const callouts = await response.json();

  console.log("Callouts length:", callouts.length)

  for(let i = callouts.length - 1; i>=0; i--){
    let callout: Object = callouts[i]; 

    const senderUsername = await getCalloutSenderUsername(callout["id"]);
    Object.defineProperty(callout, "senderUsername", {
      value: senderUsername
    });

    callouts[i] = callout;
  }
  return callouts;
};

export async function getCalloutSenderUsername (id: Number) {
  console.log("eee");
  const url = url_endpoint + "/api/get_callout_sender/" + id;
  let response = await fetch(url);
  const sender = await response.json();
  return sender.username; 
};
