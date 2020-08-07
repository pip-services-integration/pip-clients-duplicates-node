
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { RetriesMemoryClientV1 } from '../../src/version1/RetriesMemoryClientV1';
import { RetriesClientV1Fixture } from './RetriesClientV1Fixture';

suite('RetriesDirectClientV1', () => {
    let client: RetriesMemoryClientV1;
    let fixture: RetriesClientV1Fixture;

    setup((done) => {

        client = new RetriesMemoryClientV1();
        let references = References.fromTuples(
            new Descriptor('pip-services-retries', 'client', 'memory', 'default', '1.0'), client
        );
        //client.setReferences(references);
        fixture = new RetriesClientV1Fixture(client);
        done();
    });

    teardown((done) => {
        done();
    });

    test('Get Retry Groups', (done) => {
        fixture.testGetRetryGroups(done);
    });

    test('Get Retries', (done) => {
        fixture.testGetRetries(done);
    });

    test('Retries', (done) => {
        fixture.testRetries(done);
    });

});