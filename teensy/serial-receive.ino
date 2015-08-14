#include <OctoWS2811.h>

// OctoWS2811 settings
const int ledsPerStrip = 270; // change for your setup
const byte numStrips = 4; // change for your setup
const int numLEDs = ledsPerStrip*numStrips;
const int halfLEDs = numLEDs/2;
const int quartLEDs = numLEDs/4;

DMAMEM int displayMemory[ledsPerStrip*6];
int drawingMemory[ledsPerStrip*6];
const int config = WS2811_GRB | WS2811_800kHz;
OctoWS2811 leds(ledsPerStrip, displayMemory, drawingMemory, config);



void setup()
{
  Serial.begin(115200);
  leds.begin();
}


void loop()
{
  if (Serial.available() > 0) {
    byte incomingBytes[numLEDs*3];
    Serial.readBytes((char *)incomingBytes,numLEDs*3);
    
    //Strip 1
    for(int led=0; led<quartLEDs; led++) {
      int addr = led*3;
      byte r = incomingBytes[addr];
      byte g = incomingBytes[addr+1];
      byte b = incomingBytes[addr+2];
      
      leds.setPixel(led+quartLEDs,r,g,b);
    }
    
    for(int led=quartLEDs; led<halfLEDs; led++) {
      int addr = led*3;
      byte r = incomingBytes[addr];
      byte g = incomingBytes[addr+1];
      byte b = incomingBytes[addr+2];
      
      leds.setPixel(led-quartLEDs,r,g,b);
    }      

    for(int led=halfLEDs; led<numLEDs; led++) {
      int addr = led*3;
      byte r = incomingBytes[addr];
      byte g = incomingBytes[addr+1];
      byte b = incomingBytes[addr+2];
      
      leds.setPixel(led+halfLEDs,r,g,b);
    }

  }
  leds.show();
}
