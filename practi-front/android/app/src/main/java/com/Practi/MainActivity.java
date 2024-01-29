package com.Practi;

import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onBackPressed() {
        Log.d(TAG, "Back button pressed");

        // If you want to navigate back within the web view
        if (this.bridge != null) {
            Log.d(TAG, "Attempting to navigate back within the web view");
            if (this.bridge.getWebView().canGoBack()) {
                this.bridge.getWebView().goBack();
                Log.d(TAG, "Navigated back within the web view");
            } else {
                Log.d(TAG, "Web view cannot go back further");
                // If there is no web view to go back, handle it as desired (e.g., close the app)
                super.onBackPressed();
                Log.d(TAG, "Handling back button using default behavior (closing the app)");
            }
        } else {
            // If there is no web view, handle it as desired (e.g., close the app)
            super.onBackPressed();
            Log.d(TAG, "Handling back button using default behavior (closing the app)");
        }
    }
}
