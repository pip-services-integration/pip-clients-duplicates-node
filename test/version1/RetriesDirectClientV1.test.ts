
import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { RetriesMemoryPersistence } from 'pip-services-retries-node';
import { RetriesController } from 'pip-services-retries-node';

import { RetriesDirectClientV1 } from '../../src/version1/RetiresDirectClientV1';
import { RetriesClientV1Fixture } from './RetriesClientV1Fixture';


suite('RetriesDirectClientV1', () => {
    let persistence: RetriesMemoryPersistence;
    let controller: RetriesController;
    let client: RetriesDirectClientV1;
    let fixture: RetriesClientV1Fixture;

    setup((done) => {
        persistence = new RetriesMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new RetriesController();
        controller.configure(new ConfigParams());

        client = new RetriesDirectClientV1();

        let references = References.fromTuples(
            new Descriptor('pip-services-retries', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-retries', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-retries', 'client', 'direct', 'default', '1.0'), client
        );

        controller.setReferences(references);
        client.setReferences(references);

        fixture = new RetriesClientV1Fixture(client);

        persistence.open(null, done);
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('Get Retry Collections', (done) => {
        fixture.testGetRetryCollections(done);
    });

    test('Get Retries', (done) => {
        fixture.testGetRetries(done);
    });

    test('Retries', (done) => {
        fixture.testRetries(done);
    });

});