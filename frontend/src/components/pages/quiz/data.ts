export const filename: string = 'polarization.c';
export const language: string = 'c';
export const code: string = `
  double polarization_index(int **votes, int num_voters, int num_candidates) {
    int **distances = (int **)malloc(num_voters * sizeof(int *));
    for (int i = 0; i < num_voters; i++) {
        distances[i] = (int *)malloc(num_voters * sizeof(int));
    }
    calculate_vote_swap_dist(votes, num_voters, distances, num_candidates);

    int best_1 = 0;
    int min_sum = INT_MAX;
    for (int i = 0; i < num_voters; i++) {
        int sum = 0;
        for (int j = 0; j < num_voters; j++) {
            sum += distances[i][j];
        }
        if (sum < min_sum) {
            min_sum = sum;
            best_1 = i;
        }
    }

    int *best_vec = distances[best_1];
    int first_kemeny = 0;
    for (int i = 0; i < num_voters; i++) {
        first_kemeny += best_vec[i];
    }

    int **new_distances = (int **)malloc((num_voters - 1) * sizeof(int *));
    for (int i = 0, k = 0; i < num_voters; i++) {
        if (i == best_1) continue;
        new_distances[k] = distances[i];
        k++;
    }

    int **relatives = (int **)malloc((num_voters - 1) * sizeof(int *));
    for (int i = 0; i < num_voters - 1; i++) {
        relatives[i] = (int *)malloc(num_voters * sizeof(int));
        for (int j = 0; j < num_voters; j++) {
            relatives[i][j] = new_distances[i][j] - best_vec[j];
            if (relatives[i][j] >= 0) {
                relatives[i][j] = 0;
            }
        }
    }

    int best_2 = 0;
    min_sum = INT_MAX;
    for (int i = 0; i < num_voters - 1; i++) {
        int sum = 0;
        for (int j = 0; j < num_voters; j++) {
            sum += relatives[i][j];
        }
        if (sum < min_sum) {
            min_sum = sum;
            best_2 = i;
        }
    }

    if (best_2 >= best_1) {
        best_2 += 1;
    }

    int chosen[2] = {best_1, best_2};
    if (chosen[0] > chosen[1]) {
        int temp = chosen[0];
        chosen[0] = chosen[1];
        chosen[1] = temp;
    }

    int second_kemeny_1 = local_search_kKemeny_single_k(votes, 2, 1, num_voters, chosen);
    int second_kemeny_2 = local_search_kKemeny_single_k(votes, 2, 1, num_voters, NULL);
    int second_kemeny = second_kemeny_1 < second_kemeny_2 ? second_kemeny_1 : second_kemeny_2;

    double max_dist = (num_candidates) * (num_candidates - 1) / 2.0;
    double value = 2 * (first_kemeny - second_kemeny) / (double)(num_voters) / max_dist;

    for (int i = 0; i < num_voters; i++) {
        free(distances[i]);
    }
    free(distances);
    free(new_distances);
    for (int i = 0; i < num_voters - 1; i++) {
        free(relatives[i]);
    }
    free(relatives);

    return value;
}`;
