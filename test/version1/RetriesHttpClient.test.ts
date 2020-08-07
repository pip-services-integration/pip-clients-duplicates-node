import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { RetriesMemoryPersistence } from 'pip-services-retries-node';
import { RetriesController } from 'pip-services-retries-node';
import { RetriesHttpServiceV1 } from 'pip-services-retries-node';

import { RetriesHttpClientV1 } from '../../src/version1/RetriesHttpClientV1';
import { RetriesClientV1Fixture } from './RetriesClientV1Fixture';

suite('RetriesHttpClientV1', () => {
    let persistence: RetriesMemoryPersistence;
    let controller: RetriesController;
    let service: RetriesHttpServiceV1;
    let client: RetriesHttpClientV1;
    let fixture: RetriesClientV1Fixture;

    setup((done) => {
        persistence = new RetriesMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new RetriesController();
        controller.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        service = new RetriesHttpServiceV1();
        service.configure(httpConfig);

        client = new RetriesHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('pip-services-retries', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-retries', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-retries', 'service', 'http', 'default', '1.0'), service,
            new Descriptor('pip-services-retries', 'client', 'http', 'default', '1.0'), client
        );
        controller.setReferences(references);
        service.setReferences(references);
        client.setReferences(references);

        fixture = new RetriesClientV1Fixture(client);

        persistence.open(null, (err) => {
            if (err) {
                done(err);
                return;
            }

            service.open(null, (err) => {
                if (err) {
                    done(err);
                    return;
                }

                client.open(null, done);
            });
        });
    });

    teardown((done) => {
        client.close(null, (err) => {
            service.close(null, (err) => {
                persistence.close(null, done);
            });
        });
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