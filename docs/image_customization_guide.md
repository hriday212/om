# Om Coldrink House - Product Image Customization Guide

This guide helps you replace the temporary placeholders on your website with **real, high-quality, authentic photographs of your products** (Matthri, Gudd Paare, and Pickles). 

Real photos build trust, look incredibly delicious, and immediately set you apart from competitors using generic or AI-generated stock files.

---

## 1. Quick Image Replacement Instructions

To replace an image on the website, follow these steps:

1. **Prepare your image**: Save your new image in **JPG** or **PNG** format.
2. **Move it to the assets folder**: Place the image inside the `assets/` folder in your project directory:
   * Location: `c:\Users\Hrida\Downloads\Om\assets\`
3. **Update the code**: Open `index.js` and locate the `products` list at the very top. Change the `image` field to point to your local file. 

For example, if you save your Matthri picture as `matthri.jpg` inside the `assets/` folder, change:
```javascript
image: "assets/punjabi_toast_khari.png",
```
to:
```javascript
image: "assets/matthri.jpg",
```

---

## 2. Recommended Image Specifications

To keep the website loading fast and looking clean:
* **Shape/Aspect Ratio**: Use a **Square (1:1)** aspect ratio for all product catalog images. This keeps cards neat and uniform.
* **Resolution**: **800 x 800 pixels** or **1000 x 1000 pixels**. Anything larger will slow down the website's loading speed on mobile devices.
* **Format**: Save as **JPG** (better for photos) or **WebP** (best for web speed).

---

## 3. How to Shoot Premium Product Photos with a Smartphone

You don't need a professional camera or an expensive studio. You can take beautiful, premium-looking photos of pickles and snacks using your mobile phone:

### 💡 The Lighting (The most critical part)
* **Never use camera flash**: It makes food look flat, creates harsh reflections on glass jars, and ruins colors.
* **Use indirect natural daylight**: Place a table near a window during the day. Side-lighting from a window highlights the texture of flaky Matthri and the glossy oil of the achar beautifully.

### 🪵 The Background & Props
* **Choose a rustic background**: Use a wooden dining table, a stone countertop, or a light-colored jute cloth. Avoid colorful plastic or glossy metal sheets.
* **Show the ingredients**: Sprinkle some carom seeds (ajwain) and black pepper next to the Matthri. Place a whole green chilli, raw mango slice, or mustard seeds next to the pickle jars.
* **Style the jar**: Clean the outside of the glass jar completely. A sticky oil smudge on the glass can look unappealing. Show the rich color of the pickle through the clear glass, or spoon some pickle out onto a small ceramic or brass bowl next to the jar.

### 📱 Camera Angles & Editing
* **Shoot at a 45-degree angle**: This is the natural view of someone sitting at a table looking at food. It shows both the side texture and the top details.
* **Clean the lens**: Always wipe your phone camera lens before shooting; kitchen grease on the lens will make photos look hazy.
* **Slightly edit (Don't over-filter)**: Use free apps like *Lightroom Mobile* or *Snapseed*. Increase the **contrast** slightly, make the colors **warmer** (to highlight gold/terracotta tones), and increase **sharpness**.

---

## 4. Finding Free, High-Quality Stock Photos (Temporary Alternative)

If you need temporary, professional placeholders before taking your own photos, use free stock sites:
1. **Unsplash** (`unsplash.com`)
2. **Pexels** (`pexels.com`)

### Recommended Search Keywords:
* **For Sweets/Sacks**: *"Indian sweets"*, *"Shakkarpara"*, *"Mathri"*, *"Indian snacks tea"*.
* **For Pickles**: *"Indian pickle achar"*, *"mango pickle"*, *"chutney spices"*, *"sarson oil mustard"*.
