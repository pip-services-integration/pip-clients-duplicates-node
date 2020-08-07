import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { RetriesDirectClientV1 } from '../version1/RetriesDirectClientV1';
import { RetriesMemoryClientV1 } from '../version1/RetriesMemoryClientV1';
import { RetriesHttpClientV1 } from '../version1/RetriesHttpClientV1';
import { RetriesNullClientV1 } from '../version1/RetriesNullClientV1';


export class RetriesClientsFactory extends Factory {
	public static Descriptor = new Descriptor("pip-clients-retries", "factory", "default", "default", "1.0");
	public static DirectClientDescriptor = new Descriptor("pip-clients-retries", "client", "direct", "*", "1.0");
	public static MemoryClientDescriptor = new Descriptor("pip-clients-retries", "client", "memory", "*", "1.0");
	public static HttpClientDescriptor = new Descriptor("pip-clients-retries", "client", "http", "*", "1.0");
	public static NullClientDescriptor = new Descriptor("pip-clients-retries", "client", "null", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(RetriesClientsFactory.DirectClientDescriptor, RetriesDirectClientV1);
		this.registerAsType(RetriesClientsFactory.MemoryClientDescriptor, RetriesMemoryClientV1);
		this.registerAsType(RetriesClientsFactory.HttpClientDescriptor, RetriesHttpClientV1);
		this.registerAsType(RetriesClientsFactory.NullClientDescriptor, RetriesNullClientV1);
	}
	
}
