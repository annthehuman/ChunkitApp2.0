Paper
================
Anna Galkova, Alena Konina 1, Anna Mauranen 1
1 University of Helsinki
2025-03-16

# Summary

ChunkitApp 2.0 is a data collection platform for speech segmentation
experiments. It allows researchers to design and run their experiments,
as well as pre-process their data. It initially grew out of the Chunking
in Language project (2017-2021, University of Helsinki, Mauranen (2012))
and was later featured in our group’s research (Vetchinnikova, Mauranen,
and Mikušová (2017), Vetchinnikova et al. (2022), Dobrego, Konina, and
Mauranen (2023), Vetchinnikova et al. (2023)).

# Statement of need

It was designed to present participants with a series of speech extracts
accompanied with their transcripts. Participants are then able to
segment the orthographic transcript for each extract by tapping an
interactive symbol between tokens (less strictly speaking, words)
according to experiment instructions. At the back-end, the tapped symbol
is recorded as a segment boundary. If participant taps the symbol twice,
the boundary is removed both from the interface and the data log. The
app was initially designed for collecting the most naturalistic data
possible, so we used tablets as a medium for running the experiment.
However, it can also run on a laptop or PC with a mouse.

Apart from raw chunking data, as we call it, which includes the position
and timestamp of each segment boundary marked by individual
participants, the ChunkitApp 2.0 aggregates the data across participants
and extracts. Moreover, it can run Monte Carlo simulations to ascertain
the degree of randomness in segmentation behaviour. Finally, researchers
can include comprehension questions after each extract, collect
background data on participants and their feedback, and offer
participants an English proficiency test.

The ChunkitApp features two tracks: Design & Run and Fetch & Analyse.
Design & Run lets researchers construct their experiment using
pre-programmed blocks and generates a link that allows participants to
take part in it. If necessary, integration with Prolific is built into
the app. The data is collected and saved on the server. Fetch & Analyse
is the part of the app where researchers can track data collection and
download raw and aggregated data.

The development of the app was funded by the Swedish Cultural Foundation
in Finland (grant number 157452). The authors declare that there is no
conflict of interest pertaining to the development of the app.

# Community guidelines

If you wish to contribute to the ChunkitApp 2.0, you need to fork the
initiral repository. For publications and talks, see Citations on how to
cite.

If you encountered a bug, you can report an issue through Github or seel
support at <alena.konina@helsinki.fi>

# Citations

To cite the app, please use the following from the References section
(to be updated to a jounal reference when published) - Galkova, Konina,
and Mauranen (2025)

# Acknowledgments

We would like to thank Aleksandra Dobrego, Svetlana Vetchinnikova,
Michal Josífko, and Nina Mikušova for their contributions to the initial
versions of the app.

# References

The app was modelled after the original ChunkitApp used for collecting
data in the CLUMP project. Below you can a list of publications
featuring data collected through the original app.

<div id="refs" class="references csl-bib-body hanging-indent"
entry-spacing="0">

<div id="ref-dobrego2023continuous" class="csl-entry">

Dobrego, Aleksandra, Alena Konina, and Anna Mauranen. 2023. “Continuous
Speech Segmentation by L1 and L2 Speakers of English: The Role of
Syntactic and Prosodic Cues.” *Language Awareness* 32 (3): 487–507.

</div>

<div id="ref-github2025" class="csl-entry">

Galkova, Anna, Alena Konina, and Anna Mauranen. 2025. “ChunkitApp 2.0.”
2025. <https://github.com/annthehuman/ChunkitApp2.0>.

</div>

<div id="ref-mauranen2012linear" class="csl-entry">

Mauranen, Anna. 2012. “Linear Unit Grammar—a Real-Time Grammar.” *The
Encyclopedia of Applied Linguistics*, 1–11.

</div>

<div id="ref-Vetchinnikova:2022" class="csl-entry">

Vetchinnikova, Svetlana, Alena Konina, Nitin Williams, Nina Mikušová,
and Anna Mauranen. 2022. “Perceptual Chunking of Spontaneous Speech:
Validating a New Method with Non-Native Listeners.” *Research Methods in
Applied Linguistics* 1 (2).
<https://doi.org/10.1016/j.rmal.2022.100012>.

</div>

<div id="ref-vetchinnikova2023chunking" class="csl-entry">

———. 2023. “Chunking up Speech in Real Time: Linguistic Predictors and
Cognitive Constraints.” *Language and Cognition* 15 (3): 453–79.
<https://doi.org/10.1017/langcog.2023.8>.

</div>

<div id="ref-Vetchinnikova:2017" class="csl-entry">

Vetchinnikova, Svetlana, Anna Mauranen, and Nina Mikušová. 2017.
“ChunkitApp: Investigating the Relevant Units of Online Speech
Processing.” In *Proceedings of INTERSPEECH 2017*.
<https://doi.org/10.21437/Interspeech.2017>.

</div>

</div>
