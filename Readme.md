# **WalletConnect Unity Integration for Vara Network**

This repository provides a comprehensive solution to integrate WalletConnect and Substrate-based blockchain features into Unity WebGL projects, specifically targeting the Vara Network. It includes a TypeScript library compatible with Unity's WebGL environment and a step-by-step guide for seamless integration.

---

## **Features**
- Full support for Vara Network interactions.
- WalletConnect integration for managing blockchain accounts and transactions.
- Compatible with Unity WebGL builds.
- Polyfills for Node.js modules (`Buffer`, `crypto`) to enable browser-based environments.

---

## **Getting Started**

Follow the instructions below to set up and use this repository.

---

### **Prerequisites**
- **Node.js** (v16 or later)
- **Yarn** (v1.22 or later)
- **Unity** (2021.3 LTS or later)
- **WebGL Build Module** for Unity

---

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/Vara-Lab/vara-wallet-unity-webgl.git
   cd walletconnect-unity
   ```
2. Install dependencies:
   ```bash
      yarn install
   ```
3. Build the TypeScript library:
   ```bash
     yarn build
   ```
The built library will be available in the dist/ folder as walletconnect.umd.js

### **Integration with Unity**

1. **Copy the Library**

   Copy the `dist/walletconnect.umd.js` file to the `Assets/StreamingAssets` folder in your Unity project.

   - If the folder `StreamingAssets` doesn’t exist, create it in the `Assets` directory.

2. **Create a Unity-Compatible Bridge**

   Add a `.jslib` file (e.g., `walletconnect.jslib`) in the `Assets/Plugins` folder.

   **Example `walletconnect.jslib`:**
   ```javascript
   mergeInto(LibraryManager.library, {
       InitializeApi: async function () {
           try {
               if (typeof WalletConnect === "undefined") {
                   throw new Error("WalletConnect is not defined. Ensure walletconnect.umd.js is loaded.");
               }
               await WalletConnect.ApiService.initializeApi("wss://testnet.vara.network");
               console.log("API initialized successfully.");
           } catch (error) {
               console.error("Error initializing API:", error);
           }
       }
   });

   ```

2. **Create a Unity-Compatible Bridge**

   Create a Unity C# script to call the JavaScript functions.

   Example WalletIntegration.cs:

```csharp
using UnityEngine;
using System.Runtime.InteropServices;

public class WalletIntegration : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void InitializeApi();

    void Start()
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
            Debug.Log("Initializing WalletConnect API...");
            InitializeApi();
        #else
            Debug.Log("Not running in WebGL");
        #endif
    }
}

```

4. **Build for WebGL**
  - Switch your Unity platform to WebGL:
    Go to File > Build Settings.
  - Select WebGL and click Switch Platform.
    Configure the WebGL build settings:

  - In Project Settings > Player > WebGL, disable compression or use Gzip.
  
  - Build your Unity project:

  - Go to File > Build and Run.

## Contributing

We welcome contributions to this project! If you'd like to contribute, please follow these guidelines:

1. **Fork the Repository**:  
   Click on the "Fork" button at the top of this repository to create your own copy.

2. **Create a Feature Branch**:  
   Create a new branch for your feature or bugfix.

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Submit a Pull Request**:  
   Once your changes are ready, submit a pull request to the `main` branch. Be sure to include a detailed description of your changes and the problem they solve.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
