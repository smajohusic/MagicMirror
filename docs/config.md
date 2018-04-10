Before we can start the application, we need to set all the configuration values.
If you navigate to ```/javascript``` you will find ```config.js```. Open this file, and you will see
all the settings that are available in one place.

We can break the config file in two parts, default settings and module settings.
There is no need too change the "default" settings at all, you can skip too the module settings at the end.

First lets look at the default settings that you may change.

##### Server settings

<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>port</code></td>
			<td>
			    <p>Used to set the port on the server. Be carefull not to use a port that is already in use</p>
			    <p><strong>Default:</strong> 8080</p>
			</td>
		</tr>
		<tr>
            <td><code>address</code></td>
            <td>
                <p>Used to set the URL on the server.</p>
                <p><strong>Default:</strong> 'localhost'</p>
            </td>
        </tr>
        <tr>
            <td><code>ipWhitelist</code></td>
            <td>
                <p>Sets what IPs are allowed or blackliested</p>
                <p><strong>Default:</strong> ['127.0.0.1', '::ffff:127.0.0.1', '::1']</p>
            </td>
        </tr>
	</tbody>
</table>

##### Electron settings
Also, see [Electron](https://electronjs.org/docs) documentation for more information and settings.

<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>options</code></td>
			<td>
			    <p>Define additional settings for Electron app before it's created</p>
			    <p><strong>Default:</strong> {}</p>
			</td>
		</tr>
		<tr>
            <td><code>fullscreen</code></td>
            <td>
                <p>Toggles fullscreen on the Electron app</p>
                <p><strong>Default:</strong> true</p>
            </td>
        </tr>
        <tr>
            <td><code>autoHideMenuBar</code></td>
            <td>
                <p>Toggles if the Menu Bar should be visible</p>
                <p><strong>Default:</strong> false</p>
            </td>
        </tr>
        <tr>
            <td><code>zoom</code></td>
            <td>
                <p>Set the zoom on the Electron window</p>
                <p><strong>Default:</strong> zoom</p>
            </td>
        </tr>
	</tbody>
</table>

##### Defaults
<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>language</code></td>
			<td>
			    <p>Sets the language used troughout the application where it's implemented</p>
			    <p><strong>Default:</strong> 'en'</p>
			</td>
		</tr>
		<tr>
            <td><code>timeFormat</code></td>
            <td>
                <p>Set the correct Timeformat</p>
                <p><strong>Default:</strong> 24</p>
            </td>
        </tr>
        <tr>
            <td><code>units</code></td>
            <td>
                <p>Sets how to display units</p>
                <p><strong>Default:</strong> 'metric'</p>
            </td>
        </tr>
        <tr>
            <td><code>debug</code></td>
            <td>
                <p>Enables devTools so you can debug</p>
                <p><strong>Default:</strong> false</p>
            </td>
        </tr>
	</tbody>
</table>

### Modules
And now let's configurate the modules that are used:

#### Weather
<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>location</code></td>
			<td>
			    <p>Set the location/city</p>
			</td>
		</tr>
		<tr>
            <td><code>locationID</code></td>
            <td>
                <p>Set the correct locationId based on your location.
                Find your correct id by checking <a href="http://openweathermap.org/help/city_list.txt">OpenWeatherMap<a/></p>
            </td>
        </tr>
        <tr>
            <td><code>appid</code></td>
            <td>
                <p><strong>Required</strong></p>
                <p>Used to make API calls to collect the weather information.
                You need to create an account at <a href="https://home.openweathermap.org/">OpenWeatherMap</a> to get the API key</p>
            </td>
        </tr>
        <tr>
            <td><code>updateInterval</code></td>
            <td>
                <p>How often should we get new weather information.</p>
                <p><strong>Default:</strong> 10 * 60000</p>
            </td>
        </tr>
        <tr>
            <td><code>apiVersion</code></td>
            <td>
                <p>The API version to use</p>
                <p><strong>Default:</strong> 2.5</p>
            </td>
        </tr>
         <tr>
                <td><code>apiBase</code></td>
                <td>
                    <p>The base URL for OpenWeatherMap API.</p>
                </td>
            </tr>
            <tr>
                <td><code>weatherEndpoint</code></td>
                <td>
                    <p>The endpoint for the API</p>
                </td>
            </tr>
	</tbody>
</table>

#### Jokes
<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>apiEnpoints</code></td>
			<td>
			    <p>Define different API url/endpoints that return a joke</p>
			</td>
		</tr>
		<tr>
            <td><code>duration</code></td>
            <td>
                <p>How often to fetch a new joke.</p>
            </td>
        </tr>
	</tbody>
</table>

#### Clock
<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>showDate</code></td>
			<td>
			    <p>Allow displaying the date</p>
			</td>
		</tr>
		<tr>
            <td><code>showSeconds</code></td>
            <td>
                <p>Allow displaying the clock</p>
            </td>
        </tr>
	</tbody>
